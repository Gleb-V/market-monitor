<?php

namespace App\Security;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;

class LoginSuccessHandler implements AuthenticationSuccessHandlerInterface
{
  public function onAuthenticationSuccess(Request $request, TokenInterface $token): JsonResponse
  {
    /** @var \App\Entity\User $user */
    $user = $token->getUser();

    return new JsonResponse([
      'user' => [
        'id'    => $user->getId(),
        'email' => $user->getEmail(),
        'roles' => $user->getRoles(),
      ],
    ], 200);
  }
}
