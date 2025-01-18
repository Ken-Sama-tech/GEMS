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
        $img = $image['type'];
        return filter_var(trim($img), FILTER_SANITIZE_SPECIAL_CHARS);
        //     if (isset($image)) {
        //         try {

        //             $img = $image;
        //             $img_name = $img['name'];
        //             $img_tmpName = $img['tmp_name'];
        //             $img_size = $img['size'];
        //             $img_err = $img['err'];
        //             $img_type = $img['type'];

        //             $img_ext = strtolower(pathinfo($img_name, PATHINFO_EXTENSION));

        //             $allowedImgType = ['image/jpeg', 'image/png', 'image/jpg'];

        //             if (in_array($img_type, $allowedImgType)) {
        //                 if ($img_err === 0) {
        //                     if ($img_size <= 5 * 1024 * 1024) {
        //                         $uploadDir = '../../studentProfile/';
        //                         $newImg = uniqid('stdProfile_', true) . '.' . $img_ext;
        //                         $targetFile = $uploadDir . $newImg;

        //                         if (move_uploaded_file($img_tmpName, $targetFile)) {
        //                             return $targetFile;
        //                         } else {
        //                             throw new Exception('An error occured while uploading the image');
        //                         }
        //                     } else {
        //                         throw new Exception('Maximu image size is 5mb');
        //                     }
        //                 } else {
        //                     throw new Exception('Image contains error' . $img_err);
        //                 }
        //             } else {
        //                 throw new Exception('Invalid image type, or image is not png/jpg');
        //             }
        //         } catch (Exception $e) {
        //             echo json_encode('Failed to upload image. ' . $e->getMessage());
        //         }
        //     } else {
        //         return filter_var(trim($img), FILTER_SANITIZE_SPECIAL_CHARS);
        //     }
    }
}
