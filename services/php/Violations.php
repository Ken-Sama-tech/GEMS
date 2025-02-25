<?php

require_once('../../config/database.php');
require_once('../../includes/utils/php/jsonEncoder.inc.php');
require_once('../../includes/utils/php/tableValidator.php');

$validate = new Validator();
$validate->isTableExist('articles');
$validate->isTableExist('articleSections');
$validate->isTableExist('sanctions');

class Violation extends DataBaseHost
{

    private $violations = [];

    private function fetchArticles()
    {
        try {
            $conn = $this->connect();
            $conn->beginTransaction();

            $sql = 'SELECT * FROM articles';

            $stmt = $conn->prepare($sql);

            if (!$stmt) {
                throw new Exception('Something went wrong. Failed to prepare sql');
            }

            $stmt->execute();
            $conn->commit();
            $result = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $result[] = $row;
            }

            $this->violations['articles'] = $result;
        } catch (Exception $e) {
            JsonEncoder::jsonEncode(['Exception' => $e->getMessage()]);
            die();
        }
    }

    private function fetchArticleSections()
    {
        try {
            $conn = $this->connect();
            $conn->beginTransaction();

            $sql = 'SELECT * FROM articleSections';

            $stmt = $conn->prepare($sql);

            if (!$stmt) {
                throw new Exception('Something went wrong. Failed to prepare sql');
            }

            $result = [];

            $stmt->execute();
            $conn->commit();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $result[] = $row;
            }
            $this->violations['articleSections'] = $result;
        } catch (Exception $e) {
            JsonEncoder::jsonEncode(['Exception' => $e->getMessage()]);
            die();
        }
    }

    private function fetchSanctions()
    {
        try {
            $conn = $this->connect();
            $conn->beginTransaction();

            $sql = 'SELECT * FROM sanctions';

            $stmt = $conn->prepare($sql);

            if (!$stmt) {
                throw new Exception('Something went wrong. Failed to prepare sql');
            }

            $result = [];

            $stmt->execute();
            $conn->commit();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $result[] = $row;
            }

            $this->violations['sanctions'] = $result;
        } catch (Exception $e) {
            JsonEncoder::jsonEncode(['Exception' => $e->getMessage()]);
            die();
        }
    }

    public function insertViolationInTheArray()
    {
        $this->fetchArticles();
        $this->fetchArticleSections();
        $this->fetchSanctions();
        echo json_encode($this->violations);
    }
}
$violation = new Violation();
$violation->insertViolationInTheArray();
