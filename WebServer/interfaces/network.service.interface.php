<?php

interface NetworkServiceInterface {
    public static function Deserialize(string $baseData);
    public static function FromDTO($dto);
}
?>