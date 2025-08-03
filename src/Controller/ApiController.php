<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class ApiController extends AbstractController
{
    #[Route('/api/hello', name: 'api_hello', methods: ['GET'])]
    public function hello(): JsonResponse
    {
        $data = [
            'message' => 'Hello from API',
            'time' => date(DATE_ATOM),
        ];

        return $this->json($data);
    }
}
