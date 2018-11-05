<?php
class ConfigurationObject {
	
    public $monitorActiveOrderHours;
    public $monitorRefreshRateMinutes;
    public $deliveriesRefreshRateMinutes;
    public $commentsEnforcement;
    public $chatMode;
	
    function __construct(int $monitorActiveOrderHours, int $monitorRefreshRateMinutes, 
        int $deliveriesRefreshRateMinutes, int $commentsEnforcement, int $chatMode) {
        $this->monitorActiveOrderHours = $monitorActiveOrderHours;
        $this->monitorRefreshRateMinutes = $monitorRefreshRateMinutes;
        $this->deliveriesRefreshRateMinutes = $deliveriesRefreshRateMinutes;
        $this->commentsEnforcement = $commentsEnforcement;
        $this->chatMode = $chatMode;
	}
}
?>