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

class AuthController extends AbstractController
{
    #[Route('/register', name: 'app_register', methods: ['POST'])]
    public function register(
        Request $request,
        UserRepository $userRepository,
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse {
        // 1. Парсим JSON-запрос
        $data = json_decode($request->getContent(), true);

        if (!isset($data['email'], $data['password'])) {
            return new JsonResponse([
                'status' => 'error',
                'message' => 'Email and password are required'
            ], Response::HTTP_BAD_REQUEST);
        }

        // 2. Проверяем, нет ли уже пользователя с таким email
        $existingUser = $userRepository->findOneBy(['email' => $data['email']]);
        if ($existingUser) {
            return new JsonResponse([
                'status' => 'error',
                'message' => 'User already exists'
            ], Response::HTTP_CONFLICT);
        }

        // 3. Создаём нового пользователя
        $user = new User();
        $user->setEmail($data['email']);

        // 4. Хэшируем пароль
        $hashedPassword = $passwordHasher->hashPassword($user, $data['password']);
        $user->setPassword($hashedPassword);

        // 5. Сохраняем в БД
        $userRepository->save($user, true);

        // 6. Возвращаем успешный ответ
        return new JsonResponse([
            'status' => 'success',
            'message' => 'User registered successfully'
        ], Response::HTTP_CREATED);
    }

    #[Route('/initialize', name: 'app_initialize', methods: ['GET'])]
    public function initialize(): JsonResponse
    {
        $user = $this->getUser();

        if (!$user) {
            return new JsonResponse([
                'user' => null
            ]);
        }

        /** @var \App\Entity\User $user */
        return new JsonResponse([
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'roles' => $user->getRoles(),
            ]
        ]);
    }
}
