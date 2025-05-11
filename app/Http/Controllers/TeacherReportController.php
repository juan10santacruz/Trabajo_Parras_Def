<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TeacherReportController extends Controller
{
    public function getReport()
    {
        $user = Auth::user();
        
        // Obtener los IDs de los tests asignados al profesor
        $assignedTestIds = $user->tests()->pluck('id');

        // Obtener solo las respuestas de los tests asignados al profesor
        $answers = Answer::with('question')
            ->where('user_id', $user->id)
            ->whereHas('question', function($query) use ($assignedTestIds) {
                $query->whereIn('test_id', $assignedTestIds);
            })
            ->get();

        if ($answers->isEmpty()) {
            return response()->json([
                'message' => 'No hay respuestas registradas para generar el reporte'
            ], 404);
        }

        // Inicializar contadores para cada tipo de respuesta
        $responseTypes = [
            'Malo' => ['count' => 0, 'color' => '#FF6B6B'],
            'Regular' => ['count' => 0, 'color' => '#FFD93D'],
            'Bueno' => ['count' => 0, 'color' => '#4DABF7'],
            'Excelente' => ['count' => 0, 'color' => '#38D9A9']
        ];

        $totalResponses = 0;

        // Contar las respuestas por tipo
        foreach ($answers as $answer) {
            if (isset($responseTypes[$answer->value])) {
                $responseTypes[$answer->value]['count']++;
                $totalResponses++;
            }
        }

        // Calcular porcentajes y preparar datos para el gráfico
        $labels = [];
        $data = [];
        $colors = [];

        foreach ($responseTypes as $type => $info) {
            if ($info['count'] > 0) { // Solo incluir tipos de respuesta que tienen datos
                $percentage = ($info['count'] / $totalResponses) * 100;
                $labels[] = $type;
                $data[] = round($percentage, 2);
                $colors[] = $info['color'];
            }
        }

        // Generar recomendaciones basadas en los porcentajes
        $recommendations = $this->generateRecommendationsFromPercentages($data, $labels);

        return response()->json([
            'labels' => $labels,
            'data' => $data,
            'colors' => $colors,
            'recommendations' => $recommendations
        ]);
    }

    private function generateRecommendationsFromPercentages(array $data, array $labels): array
    {
        $recommendations = [];
        foreach ($data as $index => $percentage) {
            $type = $labels[$index];
            $recommendations[] = $this->getRecommendationByPercentage($type, $percentage);
        }
        return $recommendations;
    }

    private function getRecommendationByPercentage(string $type, float $percentage): string
    {
        $baseMessage = "El nivel '{$type}' representa el {$percentage}% de las respuestas.";

        switch ($type) {
            case 'Malo':
                if ($percentage < 25) {
                    return $baseMessage . " Es crucial implementar cambios significativos en tu enfoque pedagógico: \n" .
                           "- Desarrollar una actitud más proactiva en la planificación de clases\n" .
                           "- Mejorar la comunicación y empatía con los estudiantes\n" .
                           "- Participar en talleres de desarrollo personal y profesional\n" .
                           "- Solicitar observaciones de clase y retroalimentación de colegas\n" .
                           "- Establecer metas específicas de mejora con plazos definidos";
                } else {
                    return $baseMessage . " Es necesario fortalecer varios aspectos de tu práctica docente: \n" .
                           "- Mostrar mayor disposición para implementar nuevas metodologías\n" .
                           "- Desarrollar una actitud más receptiva hacia la retroalimentación\n" .
                           "- Aumentar el compromiso con el aprendizaje continuo\n" .
                           "- Trabajar en la gestión emocional dentro del aula\n" .
                           "- Fortalecer la colaboración con otros docentes";
                }

            case 'Regular':
                if ($percentage < 50) {
                    return $baseMessage . " Para mejorar tu desempeño, considera estos aspectos: \n" .
                           "- Desarrollar una actitud más entusiasta hacia la innovación educativa\n" .
                           "- Mostrar mayor iniciativa en la resolución de problemas en el aula\n" .
                           "- Fortalecer tu capacidad de adaptación a diferentes situaciones\n" .
                           "- Mejorar la gestión del tiempo y organización de actividades\n" .
                           "- Incrementar tu participación en actividades de desarrollo profesional";
                } else {
                    return $baseMessage . " Estás progresando bien. Para continuar mejorando: \n" .
                           "- Mantener una actitud positiva hacia los desafíos diarios\n" .
                           "- Desarrollar mayor confianza en tus capacidades pedagógicas\n" .
                           "- Fortalecer el liderazgo en el aula\n" .
                           "- Aumentar la creatividad en la planificación de actividades\n" .
                           "- Promover un ambiente más colaborativo con colegas";
                }

            case 'Bueno':
                if ($percentage < 75) {
                    return $baseMessage . " ¡Muy buen trabajo! Para alcanzar la excelencia: \n" .
                           "- Mantener tu actitud positiva y proactiva en el aula\n" .
                           "- Desarrollar un mayor liderazgo pedagógico\n" .
                           "- Fortalecer tu rol como mentor de otros docentes\n" .
                           "- Mostrar mayor iniciativa en proyectos institucionales\n" .
                           "- Compartir tus experiencias exitosas de manera más sistemática";
                } else {
                    return $baseMessage . " ¡Excelente nivel de desempeño! Para mantener tu progreso: \n" .
                           "- Continuar con tu actitud innovadora y entusiasta\n" .
                           "- Fortalecer tu papel como líder educativo\n" .
                           "- Mantener tu compromiso con la excelencia académica\n" .
                           "- Inspirar a otros docentes con tu ejemplo\n" .
                           "- Promover una cultura de mejora continua";
                }

            case 'Excelente':
                if ($percentage < 90) {
                    return $baseMessage . " ¡Felicitaciones por tu sobresaliente desempeño! Para mantener este nivel: \n" .
                           "- Continuar con tu excepcional compromiso con la educación\n" .
                           "- Mantener tu actitud inspiradora y motivadora\n" .
                           "- Seguir siendo un ejemplo de excelencia profesional\n" .
                           "- Fortalecer tu rol como líder transformador\n" .
                           "- Innovar constantemente en tu práctica pedagógica";
                } else {
                    return $baseMessage . " ¡Has alcanzado un nivel extraordinario! Para seguir inspirando: \n" .
                           "- Mantener tu pasión y dedicación por la enseñanza\n" .
                           "- Continuar siendo un referente de excelencia educativa\n" .
                           "- Liderar la transformación pedagógica en tu institución\n" .
                           "- Inspirar a otros con tu compromiso y profesionalismo\n" .
                           "- Promover una cultura de innovación y mejora continua";
                }

            default:
                return $baseMessage . " Se recomienda analizar los factores específicos que influyen en este resultado.";
        }
    }
}