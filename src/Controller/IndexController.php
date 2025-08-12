<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class IndexController extends AbstractController
{
  #[Route(
    '/{reactRouting}',
    name: 'app_react',
    requirements: ['reactRouting' => '^(?!api|_profiler|_wdt).+'],
    defaults: ['reactRouting' => null],
    methods: ['GET']
  )]
  public function index(): Response {
    return $this->render('index.html.twig');
  }
}
