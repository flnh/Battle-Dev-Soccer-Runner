<?php

namespace App\Controller;

use App\Entity\Target;
use App\Form\TargetType;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

class GameController extends AbstractController
{
    /**
     * @Route("/", name="game")
     */
    public function index(Request $request, EntityManagerInterface $entityManager, \Swift_Mailer $mailer): Response
    {
        $target = new Target();
        
        $form = $this->createForm(TargetType::class, $target);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()){
            $target->setToken(md5(uniqid()));
            $entityManager->persist($target);
            $entityManager->flush();
            $contact = $form->getData()->getEmail();
            $message = (new \Swift_Message('Nouvel inscrit'))
                // On attribue l'expéditeur
                ->setFrom($contact)
                // On attribue le destinataire
                ->setTo('lyskawaaude@gmail.com')
                // On crée le texte avec la vue
                ->setBody(
                    $this->renderView(
                        'game/contact.html.twig', compact('contact')
                    ),
                    'text/html'
                )
            ;
            $mailer->send($message);
            $this->addFlash('success', 'Votre inscription a bien été prise en compte !');
            return $this->render('game/game-over.html.twig');
            // dump($message);
        }

        return $this->render('game/index.html.twig', [
            'form' => $form->createView()
        ]);
    }
}
