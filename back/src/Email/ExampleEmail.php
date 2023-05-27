<?php 

namespace App\Email;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class ExampleEmail
{
    private $mailer;

    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }

    public function send(Request $req)
    {

        $datas = json_decode($req->getContent(), true);
        $email = (new Email())
            ->from('pms.saslab@gmail.com')
            ->to($datas['mail'])
            ->subject($datas['subject'])
            ->text($datas['text']);

            $htmlContent = '<a href="http://localhost:3000/register">cliquer-ici</a>';
            $email->html($htmlContent);

        $this->mailer->send($email);
    }
}