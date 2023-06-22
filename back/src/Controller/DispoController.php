<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\DispoService;
use Symfony\Component\HttpFoundation\Request;

#[Route('/api', name: 'api_')]
class DispoController extends AbstractController
{
    #[Route('/addDispo', name: 'app_addDispo', methods:'POST')]
    public function new(Request $request, DispoService $dispoService): Response
    {
        $dispoService->addDispo($request);

        return new Response("message sent");

    }

    #[Route('/editDispo/{id}', name: 'app_test', methods:'PUT')]
    public function edit(Request $request, int $id, DispoService $dispoService): Response
    {

        $dispoService->editDispo($request, $id);
        return new Response("Disponbilte updated");
    }


    #[Route('/AllDispos', name: 'app_dispos', methods:'GET')]
    public function getAllTypologies(DispoService $dispoService): Response
    {

        return $this->json($dispoService->getAllDispos());

    }

#[Route('/DispoByID/{id}', name: 'app_dispoId', methods:'GET')]
public function getEtabById(int $id, DispoService $dispoService): Response
{
    $dispo = $dispoService->getDispoByID($id);
    if ($dispo == null) {
        throw $this->createNotFoundException('Dispo not exist');
    }

    return $this->json($dispo);

}

#[Route('/AllDispoByIdEtab/{id}', name: 'app_AlldispoByIdEtab', methods:'GET')]
public function allDispoByIdEtab(int $id, DispoService $dispoService): Response
{
    $dispo = $dispoService->getAllDisposByIdEtab($id);
 
    return $this->json($dispo);

}





}
