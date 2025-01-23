<?php

class Sanitizers
{
    public static function sanitizeString($strings)
    {
        return filter_var(trim(strtolower($strings)), FILTER_SANITIZE_SPECIAL_CHARS);
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
        $img_name = $image['name'];
        if ($img_name !== '') {

            $img_tmp_name = $image['tmp_name'];
            $img_size = $image['size'];
            $img_type = $image['type'];
            $img_err = $image['error'];

            if ($img_err !== 0) {
                throw new Exception('Error occured while processing image' . $img_err);
            }

            $img_ext =  strtolower(pathinfo($img_name, PATHINFO_EXTENSION));

            $allowedImgTypes = ['image/png', 'image/jpg', 'image/jpeg'];
            $allowedImgExt = ['jpeg', 'jpg', 'png'];
            if (!in_array($img_type, $allowedImgTypes) || !in_array($img_ext, $allowedImgExt)) {
                throw new Exception('Invalid image type, or not a jpg or png');
            }

            if ($img_size > 5 * 1024 * 1024) {
                throw new Exception('Image cannot be more than 5mb');
            }

            $upload_dir = '../../imgs/studentProfile/';

            if (!is_dir($upload_dir)) {
                mkdir($upload_dir, 0777, true);
            }

            $new_img = uniqid('std_profile_', true) . '.' . $img_ext;
            $filePath = $upload_dir . $new_img;

            if (move_uploaded_file($img_tmp_name, $filePath)) {
                return $filePath;
            } else {
                throw new Exception('Image immigration fail');
            }
        } else {
            return filter_var(trim('../../studentProfile/profile.png'), FILTER_SANITIZE_SPECIAL_CHARS);
        }
    }
}
