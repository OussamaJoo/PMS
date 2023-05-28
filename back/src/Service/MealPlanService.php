<?php

namespace App\Service;

use App\Entity\MealPlan;
use App\Repository\MealPlanRepository;


class MealPlanService

{

    private $mealRepo;

    public function __construct(MealPlanRepository $mealRepo){
        $this->mealRepo = $mealRepo;
    }

    
    public function getAllMeals(){
        $meals[] = new MealPlan();
        $meals = $this->mealRepo -> findAll();
        $data = [];
       
        foreach ($meals as $meal) { 
           

            $data[] = [
                'id' => $meal->getId(),
                'nom' => $meal->getNom(),
                'description' => $meal->getDescription(),
                'etablissement' => $meal->getEtablissement(),
                'prix' => $meal->getPrix()

            ];
        }
        return $data;
    }

    public function getMealById(int $id){

        $meal = new MealPlan();
        $meal = $this->mealRepo -> find($id);
       
        if(!$meal){
            return null;
        }
    
       
    
        $data =  [
                    'id' => $meal->getId(),
                    'nom' => $meal->getNom(),
                    'description' => $meal->getDescription(),
                    'etablissement' => $meal->getEtablissement(),
                    'prix' => $meal->getPrix()
                    
        ];


         
        return $data;

    }

    public function getMealPlanByIdEtab(int $id){
        $mps[] = new MealPlan();
        $mps = $this->mealRepo->findByIdEatb($id);
        $data = [];

        foreach ($mps as $mp) {



            $data[] = [
                "id" => $mp->getId(),
                "nom" => $mp->getNom(),
                "prix" => $mp->getPrix(),
                

            ];
        }

        return $data;

    }


}