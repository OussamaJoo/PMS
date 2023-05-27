<?php

namespace App\Controller;

use App\Service\ReservationService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
class ReservationController extends AbstractController
{
    #[Route('/getAllReservations', name: 'app_reservation', methods:'GET')]
    public function index(ReservationService $ResService): Response
    {
        return $this->json($ResService->getAllReservations());
    }


#[Route('/ReservationById/{id}', name: 'app_resId', methods:'GET')]
public function getEtabById(int $id, ReservationService $resService): Response
{
    $res = $resService->getReservationById($id);
    if ($res == null) {
        throw $this->createNotFoundException('Reservation not exist');
    }

    return $this->json($res);

}

#[Route('/ReservationByIdEtab/{id}', name: 'app_resIdEtab', methods:'GET')]
public function getEtabByIdEtab(int $id, ReservationService $resService): Response
{
    $res = $resService->getReservationByIdEtab($id);
  

    return $this->json($res);

}



}
