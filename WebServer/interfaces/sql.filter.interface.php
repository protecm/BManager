<?php

interface SqlFilterInterface {
    public function toSqlString(string $tableName);
}
?>