<?php

require_once('../../config/database.php');
require_once('../../includes/utils/php/jsonEncoder.inc.php');
require_once('../../includes/utils/php/tableValidator.php');

$validate = new Validator();
$validate->isTableExist('articles');
$validate->isTableExist('articleSections');
$validate->isTableExist('sanctions');

class Validate extends DatabaseHost
{

    private $article;
    private $section;
    private $sanction;

    private $response = [];

    public function __construct($article, $section, $sanction)
    {
        $this->article = $article;
        $this->section = $section;
        $this->sanction = $sanction;
    }

    private function validateArticle()
    {
        try {
            $conn = $this->connect();
            $conn->beginTransaction();

            $sql = 'SELECT `articleID` FROM `articles` WHERE articleID = :article ';

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':article', $this->article);
            $stmt->execute();

            $conn->commit();

            $result = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $result[] = $row;
            }

            if (count($result) == 0) {
                throw new Exception('Article not found');
            }

            $this->response['article'] = 'ok';
        } catch (Exception $e) {
            $this->response['article'] =  $e->getMessage();
        }
    }

    private function validateSection()
    {
        try {
            $conn = $this->connect();
            $conn->beginTransaction();

            $sql = 'SELECT `articleSectionID` FROM `articleSections` WHERE articleSectionID = :section ';

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':section', $this->section);
            $stmt->execute();

            $conn->commit();

            $result = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $result[] = $row;
            }

            if (count($result) == 0) {
                throw new Exception('Section not found');
            }

            $this->response['section'] = 'ok';
        } catch (Exception $e) {
            $this->response['section'] =  $e->getMessage();
        }
    }

    private function validateSanction()
    {
        try {

            $conn = $this->connect();
            $conn->beginTransaction();

            $sql = 'SELECT `sanctionID` FROM `sanctions` WHERE sanctionID = :sanction ';

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':sanction', $this->sanction);
            $stmt->execute();

            $conn->commit();

            $result = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $result[] = $row;
            }

            if (count($result) == 0) {
                throw new Exception('Sanction not found');
            }

            $this->response['sanction'] = 'ok';
        } catch (Exception $e) {
            $this->response['sanction'] = $e->getMessage();
        }
    }

    public function validateAll()
    {
        $this->validateArticle();
        $this->validateSection();
        $this->validateSanction();

        JsonEncoder::jsonEncode($this->response);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $validate = new Validate($_POST['article'], $_POST['section'], $_POST['sanction']);
    $validate->validateAll();
}
