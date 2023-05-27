<?php

namespace App\MessageHandler;

use Symfony\Component\Messenger\Handler\MessageHandlerInterface;
use App\Entity\Prix;
use Doctrine\ORM\EntityManagerInterface;



class PrixHandler implements MessageHandlerInterface
{

    private EntityManagerInterface $em;

    
    public function __construct(EntityManagerInterface $em ){
        $this->em = $em;
       
    }
    public function __invoke(Prix $prix){


        $this->em->merge($prix);
        $this->em->flush();


    }
}



?>