package com.soloproject.soloproject;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.Key;

public class SecretKeyGenerator {

    public static Key generateSecretKey() throws NoSuchAlgorithmException {
        KeyGenerator keyGenerator = KeyGenerator.getInstance("HmacSHA256");
        SecureRandom secureRandom = new SecureRandom();
        keyGenerator.init(secureRandom);
        return keyGenerator.generateKey();
    }

    public static void main(String[] args) throws NoSuchAlgorithmException {
        SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

        System.out.println("Generated Secret Key: " + secretKey);
    }
}
