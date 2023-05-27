<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\MealPlanService;

#[Route('/api', name: 'api_')]
class MealPlanController extends AbstractController
{
    #[Route('/AllMealPlans', name: 'app_mealPlan', methods:'GET')]
    public function getAllMealPlans(MealPlanService $mealService): Response
    {
        return $this->json($mealService->getAllMeals());
    }

#[Route('/MealByID/{id}', name: 'app_MealId', methods:'GET')]
public function getEtabById(int $id, MealPlanService $mealService): Response
{
    $meal = $mealService->getMealById($id);

    if ($meal == null) {
        throw $this->createNotFoundException('Etablissement not exist');
    }

    return $this->json($meal);
}

#[Route('/MealPlanByIdEtab/{id}', name: 'app_mealIdEtab', methods:'GET')]
public function getEtabByIdEtab(int $id, MealPlanService $mealService): Response
{
    $res = $mealService->getMealPlanByIdEtab($id);
  

    return $this->json($res);

}

}
