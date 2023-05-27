<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\PrixService;
use Symfony\Component\HttpFoundation\Request;

#[Route('/api', name: 'api_')]
class PrixController extends AbstractController
{
    #[Route('/addTarif', name: 'app_prix', methods:'POST')]
    public function new(Request $request, PrixService $prixService): Response
    {

        $prixService->addTarif($request);
        return new Response("message sent");

    }

    #[Route('/editTarif/{id}', name: 'app_editTarif', methods:'PUT')]
    public function edit(Request $request, int $id, PrixService $prixService): Response
    {

        $prixService->editTarif($request, $id);
        return new Response("Prix updated");
    }



    #[Route('/AllTarifs', name: 'app_tarifs', methods:'GET')]
    public function getAllTypologies(PrixService $prixService): Response
    {

        return $this->json($prixService->getAllTarifs());
    }

#[Route('/TarifByID/{id}', name: 'app_tarifId', methods:'GET')]
public function getEtabById(int $id, PrixService $prixService): Response
{

    $tarif = $prixService->getTarifById($id);
    if ($tarif == null) {
        throw $this->createNotFoundException('Tarif not exist');
    }

    return $this->json($tarif);
}

#[Route('/SumPrix', name: 'app_tarifSum', methods:'GET')]
public function getPrixByIntervalle(Request $req, PrixService $prixService): Response
{

    $tarif = $prixService->SumPrix($req);
   

    return $this->json($tarif);
}

}
