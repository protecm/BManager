<?php

$tableName = "`orders`";
$output = "SELECT {$tableName}.*, `customers`.`name` AS 'customer_name',
			`customers`.`phone` AS 'customer_phone'
			FROM {$tableName}
			LEFT JOIN `customers`
			ON {$tableName}.`customer_id`=`customers`.`id`
			WHERE {$queryCondition}
			ORDER BY `orders`.`id` ASC";

echo $output;
?>