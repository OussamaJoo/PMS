<?php

namespace App\EventListener;

use App\Entity\User;
use Symfony\Component\HttpFoundation\RequestStack;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\Security\Core\User\UserInterface;

class JWTCreatedListener
{
    /**
     * @var RequestStack
     */
    private $requestStack;

    /**
     * @param RequestStack $requestStack
     */
    public function __construct(RequestStack $requestStack)
    {
        $this->requestStack = $requestStack;
    }

    /**
     * @param AuthenticationSuccessEvent $event
     */
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
        $data = $event->getData();
        $user = $event->getUser();

        if (!$user instanceof UserInterface) {
            return;
        }

        if ($user instanceof User) {
            $idClient = null;
            $idEtablissement = null;
            if($user->getIdClient()!= null){
                $idClient = $user->getIdClient()->getId();
            }
            if($user->getIdEtablissement()!=null){
                $idEtablissement = $user->getIdEtablissement()->getId();
            }
            $data += array(
                'id'        => $user->getId(),
                'email'     => $user->getEmail(),
                'roles'     => $user->getRoles(),
                'nom'       => $user->getNom(),
                'prenom'    => $user->getPrenom(),
                'idClient'  => $idClient,
                'idEtablissement'   => $idEtablissement
            );
        }

        $event->setData($data);
    }

}