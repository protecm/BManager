<?php

interface NetworkObjectInterface {
	public function serialize():string;
	public static function FromBase($baseData, int $type);
	public static function FromDTO($dto, int $type);
}
?>