<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\Client::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'name' => $faker->name,
        'address' => $faker->address,
        'telephone' => $faker->phoneNumber
    ];
});
