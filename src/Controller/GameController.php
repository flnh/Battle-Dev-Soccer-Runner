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
    public function index(): Response
    {
        return $this->render('game/index.html.twig', [
            'controller_name' => 'GameController',
        ]);
    }
    /**
     * @Route("/form", name="game")
     */
    public function form(Request $request, EntityManagerInterface $entityManager): Response
    {
        $target = new Target();
        
        $form = $this->createForm(TargetType::class, $target);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()){
            $target->setToken(md5(uniqid()));
            $entityManager->persist($target);
            $entityManager->flush();
            // dump($target);
        }

        return $this->render('game/form.html.twig', [
            'form' => $form->createView()
        ]);
    }
}
