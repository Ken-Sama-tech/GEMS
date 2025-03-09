<?php

class JsonEncoder
{

    public static function jsonEncode($params)
    {
        echo json_encode($params, JSON_PRETTY_PRINT);
    }
}
