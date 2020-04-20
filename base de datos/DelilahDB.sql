-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema delilah
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema delilah
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `delilah` DEFAULT CHARACTER SET utf8 ;
USE `delilah` ;

-- -----------------------------------------------------
-- Table `delilah`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah`.`product` (
  `product_id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(45) NOT NULL,
  `product_price` FLOAT NOT NULL,
  PRIMARY KEY (`product_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `delilah`.`rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah`.`rol` (
  `rol_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `rol_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`rol_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `delilah`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah`.`user` (
  `user_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_fullname` VARCHAR(255) NOT NULL,
  `user_mail` VARCHAR(255) NOT NULL,
  `user_phone` INT(11) NOT NULL,
  `user_address` TEXT NOT NULL,
  `user_username` VARCHAR(255) NOT NULL,
  `user_pass` VARCHAR(255) NULL DEFAULT NULL,
  `rol_id` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_mail_UNIQUE` (`user_mail` ASC) ,
  UNIQUE INDEX `user_user_UNIQUE` (`user_username` ASC) ,
  INDEX `fk_user_rol1_idx` (`rol_id` ASC) ,
  CONSTRAINT `fk_user_rol1`
    FOREIGN KEY (`rol_id`)
    REFERENCES `delilah`.`rol` (`rol_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 25
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `delilah`.`favorite`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah`.`favorite` (
  `product_id` BIGINT(20) UNSIGNED NOT NULL,
  `user_id` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`product_id`, `user_id`),
  INDEX `fk_product_has_user_user1_idx` (`user_id` ASC) ,
  INDEX `fk_product_has_user_product1_idx` (`product_id` ASC) ,
  CONSTRAINT `fk_product_has_user_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `delilah`.`product` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_has_user_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `delilah`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `delilah`.`login`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah`.`login` (
  `login_token` VARCHAR(255) NULL DEFAULT NULL,
  `user_id` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `fk_login_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `delilah`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `delilah`.`payment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah`.`payment` (
  `payment_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `payment_method` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`payment_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `delilah`.`state`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah`.`state` (
  `state_id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `state_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`state_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `delilah`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah`.`order` (
  `order_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT(10) UNSIGNED NOT NULL,
  `product_id` BIGINT(20) UNSIGNED NOT NULL,
  `order_quantity` INT(10) NOT NULL,
  `order_total` FLOAT NOT NULL,
  `order_hour` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `payment_id` BIGINT(20) NOT NULL,
  `state_id` BIGINT(20) UNSIGNED NOT NULL,
  PRIMARY KEY (`order_id`),
  INDEX `fk_order_state1_idx` (`state_id` ASC) ,
  INDEX `fk_order_user1_idx` (`user_id` ASC) ,
  INDEX `fk_order_payment1_idx` (`payment_id` ASC) ,
  INDEX `fk_order_product1_idx` (`product_id` ASC) ,
  CONSTRAINT `fk_order_payment1`
    FOREIGN KEY (`payment_id`)
    REFERENCES `delilah`.`payment` (`payment_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `delilah`.`product` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_state1`
    FOREIGN KEY (`state_id`)
    REFERENCES `delilah`.`state` (`state_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `delilah`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 25
DEFAULT CHARACTER SET = utf8;

INSERT INTO `delilah`.`user` (`user_fullname`, `user_mail`, `user_phone`, `user_address`, `user_username`, `user_pass`, `rol_id`) VALUES ('Jhon Doe', 'jhondoe@mail.com', '96325871', 'Colon 200', 'jhon', '123', '1');
INSERT INTO `delilah`.`user` (`user_fullname`, `user_mail`, `user_phone`, `user_address`, `user_username`, `user_pass`, `rol_id`) VALUES ('Fulanito', 'fulano@mail.com', '74125896', 'Maipu 500', 'fulano', '321', '2');
---------------------------------------------------------------------------------------------------
INSERT INTO `delilah`.`payment` (`payment_id`, `payment_method`) VALUES ('1', 'Efectivo');
INSERT INTO `delilah`.`payment` (`payment_id`, `payment_method`) VALUES ('2', 'Tarjeta');
---------------------------------------------------------------------------------------------------
INSERT INTO `delilah`.`state` (`state_id`, `state_name`) VALUES ('1', 'Nuevo');
INSERT INTO `delilah`.`state` (`state_id`, `state_name`) VALUES ('2', 'Confirmado');
INSERT INTO `delilah`.`state` (`state_id`, `state_name`) VALUES ('3', 'Preparando');
INSERT INTO `delilah`.`state` (`state_id`, `state_name`) VALUES ('4', 'Enviando');
INSERT INTO `delilah`.`state` (`state_id`, `state_name`) VALUES ('5', 'Entregado');
---------------------------------------------------------------------------------------------------
INSERT INTO `delilah`.`product` (`product_id`, `product_name`, `product_price`) VALUES ('1', 'Hamburguesa', '150');
INSERT INTO `delilah`.`product` (`product_id`, `product_name`, `product_price`) VALUES ('2', 'Lomito', '250');
INSERT INTO `delilah`.`product` (`product_id`, `product_name`, `product_price`) VALUES ('3', 'Pizza', '200');
----------------------------------------------------------------------------------------------------
INSERT INTO `delilah`.`rol` (`rol_id`, `rol_name`) VALUES ('1', 'Admin');
INSERT INTO `delilah`.`rol` (`rol_id`, `rol_name`) VALUES ('2', 'User');


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;