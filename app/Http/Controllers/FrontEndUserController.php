<?php

namespace App\Http\Controllers;

use JWTAuth;
use App\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;

class FrontEndUserController extends Controller
{
    public function signUp(Request $request) 
    {
    	$user = User::create(['email' => $request->email, 'password' => bcrypt($request->password)]);
    }

    public function signIn(Request $request) 
    {
    	try {
	    	if (! $token = JWTAuth::attempt(['email' => $request->email, 'password' => $request->password])) {
	    		return response()->json(['error' => 'invalid_credentials'], 401);
	    	}
	    } catch (JWTException $e) {
	    	return response()->json(['error' => 'could_not_create_token'], 500);
	    }

    	return response()->json(compact('token'));
    }

    public function refreshToken() 
    {
        $token = JWTAuth::getToken();

        try {
            $token = JWTAuth::refresh($token);
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        return response()->json(compact('token'));
    }
}
