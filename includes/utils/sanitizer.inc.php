<?php

class Sanitizers
{

    public static function sanitizeString($strings)
    {
        return filter_var(trim($strings), FILTER_SANITIZE_SPECIAL_CHARS);
    }

    public static function sanitizeNumber($numbers)
    {
        return filter_var(trim($numbers), FILTER_SANITIZE_NUMBER_INT);
    }
    public static function sanitizeEmail($email)
    {
        return filter_var(trim($email), FILTER_SANITIZE_EMAIL);
    }

    public static function sanitizeDate($date)
    {
        return date('Y-m-d', strtotime($date));
    }

    public static function sanitizeImage($image)
    {
        $std_img = $image['name'];
        return filter_var(trim($std_img), FILTER_SANITIZE_SPECIAL_CHARS);
    }
}
