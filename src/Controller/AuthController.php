<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

final class AuthController extends AbstractController
{
  #[Route(path: '/api/login', name: 'api_login', methods: ['POST'])]
  public function login(): never
  {
    throw new \LogicException('This route is handled by the security system.');
  }

  #[Route('/api/register', name: 'app_register', methods: ['POST'])]
  public function register(
    Request $request,
    UserRepository $userRepository,
    UserPasswordHasherInterface $passwordHasher
  ): JsonResponse {
    $data = json_decode($request->getContent(), true);

    if (!isset($data['email'], $data['password'])) {
      return new JsonResponse(['status' => 'error', 'message' => 'Email and password are required'], Response::HTTP_BAD_REQUEST);
    }

    if ($userRepository->findOneBy(['email' => $data['email']])) {
      return new JsonResponse(['status' => 'error', 'message' => 'User already exists'], Response::HTTP_CONFLICT);
    }

    $user = new User();
    $user->setEmail($data['email']);
    $user->setPassword($passwordHasher->hashPassword($user, $data['password']));
    $userRepository->save($user, true);

    return new JsonResponse(['status' => 'success'], Response::HTTP_CREATED);
  }

  #[Route('/initialize', name: 'app_initialize', methods: ['GET'])]
  public function initialize(): JsonResponse
  {
    $user = $this->getUser();
    if (!$user) {
      return new JsonResponse(['user' => null]);
    }
    /** @var \App\Entity\User $user */
    return new JsonResponse([
      'user' => [
        'id'    => $user->getId(),
        'email' => $user->getEmail(),
        'roles' => $user->getRoles(),
      ]
    ]);
  }
}
