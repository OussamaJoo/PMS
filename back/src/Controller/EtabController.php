<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\EtablissementService;

#[Route('/api', name: 'api_')]
class EtabController extends AbstractController
{
    #[Route('/AllEtabs', name: 'app_etabs', methods:'GET')]
    public function getAllTypologies(EtablissementService $etabService): Response
    {
        return $this->json($etabService->getAllEtab());
    }

#[Route('/EtabByID/{id}', name: 'app_etabId', methods:'GET')]
public function getEtabById(int $id, EtablissementService $etabService): Response
{
    $etab = $etabService->getEtabById($id);

    if ($etab == null) {
        throw $this->createNotFoundException('Etablissement not exist');
    }

    return $this->json($etab);
}
}
