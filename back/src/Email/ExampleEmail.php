<?php 

namespace App\Email;

use App\Service\UserService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class ExampleEmail
{
    private $mailer;
    private $userService;

    public function __construct(MailerInterface $mailer,UserService $userService)
    {
        $this->mailer = $mailer;
        $this->userService = $userService;
    }

    public function send(Request $req)
    {

        $datas = json_decode($req->getContent(), true);
        $subject = "Activation Compte ".$datas['etab'];
        $html = 'Pour Activer votre compte <a href="http://localhost:3000/activate/'.$this->userService->getMaxId().'">Cliquer-ici</a>';
      
        $email = (new Email())
            ->from('pms.saslab@gmail.com')
            ->to($datas['mail'])
            ->subject($subject)
            ->text($datas['text']);

            $htmlContent = $html;
            $email->html($htmlContent);

        $this->mailer->send($email);
    }
}