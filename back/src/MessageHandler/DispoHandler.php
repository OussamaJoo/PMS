<?php

namespace App\MessageHandler;

use Symfony\Component\Messenger\Handler\MessageHandlerInterface;
use App\Entity\Disponibilite;
use Doctrine\ORM\EntityManagerInterface;



class DispoHandler implements MessageHandlerInterface
{

    private EntityManagerInterface $em;
    
    
    public function __construct(EntityManagerInterface $em ){
        $this->em = $em;
       
    }
    public function __invoke(Disponibilite $dispo){

      
        $this->em->merge($dispo);
        $this->em->flush();


    }
}



?>