<?php

namespace App\Http\Controllers;

use JWTAuth;
use App\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index() 
    {
    	return Client::all();
    }
}
