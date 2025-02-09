<?php

require_once('../../config/database.php');
require_once('../../includes/utils/php/sanitizer.inc.php');
require_once('../../includes/utils/php/jsonEncoder.inc.php');

class AddViolator extends DataBaseHost
{
    private $lrn;
    private $article;
    private $section;
    private $sanction;

    public function __construct($form)
    {
        $this->lrn = Sanitizers::sanitizeNumber($form['violator-lrn']);
        $this->article = Sanitizers::sanitizeNumber($form['article']);
        $this->section = Sanitizers::sanitizeNumber($form['article-section']);
        $this->sanction = Sanitizers::sanitizeNumber($form['sanction']);
    }

    public function add()
    {

        try {
            if (empty($this->lrn)) {
                throw new Error('No lrn found');
            }

            $conn = $this->connect();
            $conn->beginTransaction();

            $sql = 'INSERT INTO ';

            $conn->commit();

            JsonEncoder::jsonEncode(['success' => 'success kunwari']);
        } catch (Error $e) {
            JsonEncoder::jsonEncode(['error' => $e->getMessage()]);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $addViolator = new AddViolator($_POST);
    $addViolator->add();
}
