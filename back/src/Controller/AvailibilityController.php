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
    #[Route('/availibility', name: 'app_availibility', methods:'GET')]
    public function index(Request $req, AvailibilityService $avaiService): Response
    {
        return $this->json($avaiService->getAvailibility($req));
    }

    #[Route('/search', name: 'app_search', methods:'POST')]
    public function search(Request $req, AvailibilityService $avaiService): Response
    {
        return $this->json($avaiService->getSearch($req)) ;
    }

    #[Route('/dispoResa', name: 'app_searchResa', methods:'POST')]
    public function dispoResa(Request $req, AvailibilityService $avaiService): Response
    {
        return $this->json($avaiService->getDispo($req)) ;
    }

    #[Route('/getHotels', name: 'app_getHotel', methods:'POST')]
    public function getHotels(Request $req, AvailibilityService $avaiService): Response
    {
        $datas = json_decode($req->getContent(), true);
        return $this->json($avaiService->getHotels($datas['hotel'])) ;
    }

    #[Route('/getSumPrix', name: 'app_getSumPrix', methods:'POST')]
    public function getSumPrix(Request $req, AvailibilityService $avaiService): Response
    {
        $datas = json_decode($req->getContent(), true);
        $dateDe = new \DateTime($datas['datedebut']);
        $dateAu = new \DateTime($datas['datefin']);
        return $this->json($avaiService->getSumPrix($dateDe, $dateAu, $datas['idTypo'])) ;
    }

    #[Route('/getAllComb', name: 'app_getAllComb', methods:'POST')]
    public function getAllCombainaisonWithPrice(Request $req, AvailibilityService $avaiService): Response
    {
        $datas = json_decode($req->getContent(), true);
        $dateDu = new \DateTime($datas['dateDu']);
        $dateAu = new \DateTime($datas['dateAu']);
        return $this->json($avaiService->getAllCombinaisonWithPrice(
            $datas['adresse'],
            $datas['nbAdultes'],
            $datas['nbChambres'],
            $datas['nbEnfants'],
            $datas['nbBebes'],
            $dateDu,
            $dateAu
        )) ;
    }

 

    #[Route('/getCombDispo', name: 'app_getAllCOmbo2', methods:'POST')]
    public function getCombainaisonDisponibleWithPrice(Request $req, AvailibilityService $avaiService): Response
    {
        $datas = json_decode($req->getContent(), true);
        $dateDu = new \DateTime($datas['dateDu']);
        $dateAu = new \DateTime($datas['dateAu']);
        return $this->json($avaiService->getCombinaisonDisponibleWithPrice(
            $datas['id'],
            $datas['nbAdultes'],
            $datas['nbChambres'],
            $datas['nbEnfants'],
            $datas['nbBebes'],
            $dateDu,
            $dateAu
        )) ;
    }


}
