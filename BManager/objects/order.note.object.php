<?php

class OrderNoteObject {
    
    public $note;
    public $isResolved;
    
    function __construct(string $note, bool $isResolved) {
        $this->note = $note;
        $this->isResolved = $isResolved;
    }
}

?>