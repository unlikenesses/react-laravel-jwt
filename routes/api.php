<?php

use Illuminate\Http\Request;

Route::post('/signup', 'FrontEndUserController@signUp');
Route::post('/signin', 'FrontEndUserController@signIn');
Route::get('/refreshToken', 'FrontEndUserController@refreshToken');

Route::group(['middleware' => 'jwt.auth'], function() {
	Route::get('/clients', 'ClientController@index');
});
