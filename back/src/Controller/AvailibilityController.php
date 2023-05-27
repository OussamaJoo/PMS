<?php

namespace App\Controller;

use App\Service\AvailibilityService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
class AvailibilityController extends AbstractController
{
    #[Route('/availibility', name: 'app_availibility',methods:'GET')]
    public function index(Request $req , AvailibilityService $avaiService): Response
    {
        return $this->json($avaiService->getAvailibility($req));
    }

    #[Route('/search', name: 'app_search',methods:'POST')]
    public function search(Request $req , AvailibilityService $avaiService): Response
    {
      return $this->json($avaiService->getSearch($req)) ;
    }

    #[Route('/dispoResa', name: 'app_searchResa',methods:'POST')]
    public function dispoResa(Request $req , AvailibilityService $avaiService): Response
    {
      return $this->json($avaiService->getDispo($req)) ;
    }
}
