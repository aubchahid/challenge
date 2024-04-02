<?php

namespace Tests\Feature;

use App\Models\Group;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;


class UserStoreTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function setUp(): void
    {
        parent::setUp();
        Group::create(['id' => 1, 'name' => 'Admin', 'slug' => 'admin']);
    }

    /** @test */
    public function it_store_user_return_201()
    {

        $userData = [
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'email' => $this->faker->safeEmail,
            'password' => 'testpassword',
            'birthdate' => '1990-01-01',
            'phone_number' => $this->faker->phoneNumber,
            'address' => $this->faker->address,
            'city' => $this->faker->city,
            'groups' => [1]
        ];

        $response = $this->json('POST', '/api/users/', $userData);

        $response->assertStatus(201);

        $response->dump();
    }
}
