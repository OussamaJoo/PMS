<?php

namespace App\Service;

use App\Entity\Prix;
use App\Entity\Typologie;
use App\Repository\PrixRepository;
use App\Repository\TypologieRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Messenger\MessageBusInterface;

class PrixService
{
    private $prixRepo;
    private $typoRepo;
    private $bus;

    public function __construct(PrixRepository $prixRepo, TypologieRepository $typoRepo, MessageBusInterface $bus)
    {

        $this->prixRepo = $prixRepo;
        $this->typoRepo = $typoRepo;
        $this->bus = $bus;

    }

    public function addTarif(Request $request): void
    {

        $datas = json_decode($request->getContent(), true);
        $prix = new Prix();

        $dateDe = new \DateTime($datas['dateDe']);
        $dateAu = new \DateTime($datas['dateAu']);



        while ($dateDe -> format('Y-m-d') <= $dateAu -> format('Y-m-d')) {
            $prix->setDatePrix($dateDe);
            $prix->setMontant($datas['montant']);

            $typo = new Typologie();
            $typo = $this->typoRepo
                ->find($datas['typologie']);

            $prix->setTypologie($typo);

            $this->bus->dispatch($prix);

            $dateDe -> modify('+1 day');
        }

    }

    public function editTarif(Request $request, int $id): void
    {

        $datas = json_decode($request->getContent(), true);
        $prix = new Prix();
        $dateDe = new \DateTime($datas['date']);

        $prix->setId($id);

        $prix->setDatePrix($dateDe);
        $prix->setMontant($datas['montant']);

        $typo = new Typologie();
        $typo = $this->typoRepo
            ->find($datas['typologie']);


        $prix->setTypologie($typo);

        $this->bus->dispatch($prix);

    }

    public function getAllTarifs()
    {

        $prix[] = new Prix();
        $prix = $this->prixRepo -> findAll();
        $data = [];

        foreach ($prix as $p) {
            $typo = new Typologie();
            $typo = $p->getTypologie();
            $data1 =  [
                'id' => $typo->getId(),
                'nom' => $typo->getNom(),
                'capacité' => $typo->getCapacite(),
                'etablissement' => $typo->getEtablissement(),
                'acceptBebe' => $typo->isAccecptBebe(),
                'acceptEnfant' => $typo->isAcceptEnfant(),
                'acceptHandicapé' => $typo->isAcceptHandicapé(),
                'annulable' => $typo->isAnnulable(),
                'remboursable' => $typo->isRemborsable(),
            ];

            $data[] = [
                'id' => $p->getId(),
                'date' => $p->getDatePrix(),
                'montant' => $p->getMontant(),
                'typologie' => $data1,

            ];
        }
        return $data;

    }

    public function getTarifById(int $id)
    {
        $prix = new Prix();
        $prix = $this->prixRepo -> find($id);


        if (!$prix) {

            return null;
        }

        $typo = new Typologie();
        $typo = $prix->getTypologie();
        $data1 =  [
            'id' => $typo->getId(),
            'nom' => $typo->getNom(),
            'capacité' => $typo->getCapacite(),
            'etablissement' => $typo->getEtablissement(),
            'acceptBebe' => $typo->isAccecptBebe(),
            'acceptEnfant' => $typo->isAcceptEnfant(),
            'acceptHandicapé' => $typo->isAcceptHandicapé(),
            'annulable' => $typo->isAnnulable(),
            'remboursable' => $typo->isRemborsable(),
        ];

        $data =  [
                    'id' => $prix->getId(),
                    'date' => $prix->getDatePrix(),
                    'montant' => $prix->getMontant(),
                    'typologie' => $data1,

        ];

        return $data;
    }

    public function getAllTarifsByIdEtab(int $id)
    {

        $prix[] = new Prix();
        $prix = $this->prixRepo -> findByIdEatb($id);
        $data = [];

        foreach ($prix as $p) {
            $typo = new Typologie();
            $typo = $p->getTypologie();
            $data1 =  [
                'id' => $typo->getId(),
                'nom' => $typo->getNom(),
                'capacité' => $typo->getCapacite(),
                'etablissement' => $typo->getEtablissement(),
                'acceptBebe' => $typo->isAccecptBebe(),
                'acceptEnfant' => $typo->isAcceptEnfant(),
                'acceptHandicapé' => $typo->isAcceptHandicapé(),
                'annulable' => $typo->isAnnulable(),
                'remboursable' => $typo->isRemborsable(),
            ];

            $data[] = [
                'id' => $p->getId(),
                'date' => $p->getDatePrix(),
                'montant' => $p->getMontant(),
                'typologie' => $data1,

            ];
        }
        return $data;

    }

   
}
