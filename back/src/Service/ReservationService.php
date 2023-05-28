<?php

namespace App\Service;

use App\Entity\Occupant;
use App\Entity\Reservation;
use App\Repository\ReservationRepository;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

class ReservationService
{
    private $reservationRepo;
    private EntityManagerInterface $em;


    public function __construct(ReservationRepository $reservationRepo, EntityManagerInterface $em)
    {
        $this->reservationRepo = $reservationRepo;
        $this->em = $em;
    }

    public function getAllReservations()
    {

        $reserv[] = new Reservation();
        $reserv = $this->reservationRepo->findAll();

        $data = [];

        foreach ($reserv as $res) {



            $data[] = [
                "id" => $res->getId(),
                "dateDebut" => $res->getDateDebut(),
                "dateFin" => $res->getDateFin(),
                "Occaupants" => $res->getIdOccupant(),
                'etablissement' => $res->getEtablissement(),
                 'typologie' => $res->getTypologie(),
                 'mealPlan' => $res->getMealPlan(),

            ];
        }

        return $data;

    }


    public function getReservationById(int $id)
    {

        $res = new Reservation();
        $res = $this->reservationRepo->find($id);

        if(!$res) {
            return null;
        }

        $data =  [
            'id' => $res->getId(),
            'dateDebut' => $res->getDateDebut(),
            'dateFin' => $res->getDateFin(),
            'etablissement' => $res->getEtablissement(),
            'typologie' => $res->getTypologie(),
            'mealPlan' => $res->getMealPlan(),
            'Occupants' => $res->getIdOccupant()

];



        return $data;
    }

    public function getReservationByIdEtab(int $id){
        $reserv[] = new Reservation();
        $reserv = $this->reservationRepo->findByIdEatb($id);
        $data = [];

        foreach ($reserv as $res) {



            $data[] = [
                "id" => $res->getId(),
                "dateDebut" => $res->getDateDebut(),
                "dateFin" => $res->getDateFin(),
                "Occaupants" => $res->getIdOccupant(),
                'etablissement' => $res->getEtablissement(),
                 'typologie' => $res->getTypologie(),
                 'mealPlan' => $res->getMealPlan(),

            ];
        }

        return $data;

    }



}
