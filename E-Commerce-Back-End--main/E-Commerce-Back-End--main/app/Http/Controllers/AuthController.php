<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request){
        $fileds = $request->validate([
            'name'=>'required|max:255',
            'email'=>'required|email|unique:users',
            'phone' => 'numeric|min:11',
            'address'=> 'string|max:255',
            'password'=>'required|confirmed'
        ]);
        $user = User::create($fileds);
        $token = $user -> createToken($request->name);
        return ['user'=>$user, 'token'=>$token->plainTextToken];
    }

    public function login(Request $request){
        $request->validate([
        'email'=>'required|email|exists:users',
        'password'=>'required'
    ]);

    $user = User::where('email',$request->email)->first();
    if(!$user || !Hash::check($request->password,$user->password)){
        return ['massege'=>'Invalid Password or Email'];
    }
    $token = $user -> createToken($user->name);
    return ['user'=>$user, 'token'=>$token->plainTextToken];
    }

    public function logout(Request $request){
        $request->user()->tokens()->delete();
    return ['massege'=>'you are logged out'];
}
}
