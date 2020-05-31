#!/usr/bin/python3.7


#System testing

import time

from selenium.webdriver import Firefox
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains




port = "3000"
port = "45727"
LOGIN = f'http://localhost:{port}/'
DASHBOARD = f'http://localhost:{port}/dashboard/'
QUERY = f'http://localhost:{port}/query/'
PREDICT = f'http://localhost:{port}/predict/'
APPROVED = f'http://localhost:{port}/approved/'
NOTAPPROVED = f'http://localhost:{port}/notapproved/'

class mydriver:
	def __init__(self):
		self.driver = Firefox(executable_path=r'/usr/bin/geckodriver')
		self.wait = WebDriverWait(self.driver, 10)
		self.driver.set_window_rect(40, 40, 800, 500)
	def teardown(self):
		# print("tearing down a driver. Please wait...")
		self.driver.quit()
		# print("tearing down done")
	def check_current_url(self,url):
		return self.driver.current_url == url or self.driver.current_url == url[:-1]

def test_protected_page_access():
	d = mydriver()
	# print("user:",d.driver.get_cookie('username')," logged in.")
	d.driver.delete_all_cookies()
	d.driver.get(DASHBOARD)
	d.wait.until(EC.alert_is_present())
	while(EC.alert_is_present()):
		try:
			d.driver.switch_to.alert.accept()
			time.sleep(1)
		except:
			assert d.check_current_url(LOGIN)
			break
	d.wait.until(lambda x: d.check_current_url(LOGIN))
	print("test_protected_page_access OK" )
	return d
	# d.teardown()

def signup(uname, pword):
	d = mydriver()
	d.driver.get(LOGIN)

	forms = d.driver.find_elements_by_tag_name("form")
	inputs = forms[1].find_elements_by_tag_name("input")
	uname = inputs[0]
	passw = inputs[1]
	confirm_passw = inputs[2]
	uname.send_keys('A'+Keys.ENTER)
	passw.send_keys('A'+Keys.ENTER)
	confirm_passw.send_keys('A'+Keys.ENTER)
	forms[1].find_element_by_tag_name("button").click()
	d.teardown()
	return (uname.text, passw.text)


def test_incorrect_login(d,uname, pword):
	d.wait.until(lambda x: d.check_current_url(LOGIN))
	d.driver.delete_all_cookies()
	time.sleep(1)
	forms = d.driver.find_elements_by_tag_name("form")
	inputs = forms[0].find_elements_by_tag_name("input")
	inputs[0].send_keys(uname+Keys.ENTER)
	inputs[1].send_keys(pword)
	# inputs[1].send_keys(pword+Keys.ENTER)
	# ^^^ If this is done, then no need to press the button!
	btn = forms[0].find_element_by_tag_name("button")
	d.wait.until(EC.element_to_be_clickable((By.TAG_NAME,"button")))
	# btn.click()
	d.driver.execute_script("arguments[0].click();", btn)


	time.sleep(1)
	try:
		assert d.check_current_url(DASHBOARD)
		print("test_incorrect_login Failed")
	except:
		print("test_incorrect_login OK")

def test_correct_login(d,uname, pword):
	d.wait.until(lambda x: d.check_current_url(LOGIN))
	#reload_to_reset_values
	d.driver.get(LOGIN)
	d.driver.delete_all_cookies()
	time.sleep(1)
	forms = d.driver.find_elements_by_tag_name("form")
	inputs = forms[0].find_elements_by_tag_name("input")
	inputs[0].send_keys(uname+Keys.ENTER)
	inputs[1].send_keys(pword)
	# inputs[1].send_keys(pword+Keys.ENTER)
	# ^^^ If this is done, then no need to press the button!
	btn = forms[0].find_element_by_tag_name("button")
	d.wait.until(EC.element_to_be_clickable((By.TAG_NAME,"button")))
	# btn.click()
	d.driver.execute_script("arguments[0].click();", btn)


	time.sleep(1)
	try:
		assert d.check_current_url(DASHBOARD)
		print("test_correct_login OK")
	except:
		print("test_correct_login Failed")
		d.driver.quit()
		exit()
	return d

def cookie_check_after_login(d,uname):
	username_cookie_value = d.driver.get_cookie('username')['value']
	try:
		assert username_cookie_value == uname
		print("cookie_check_after_login OK")
	except:
		print("cookie_check_after_login Failed")


def check_for_no_output_rows_for_impossible_input(d):
	# click_query
	time.sleep(1)
	assert d.check_current_url(DASHBOARD)
	d.driver.find_element_by_css_selector("a[href*='query'] > li").click()
	time.sleep(1)
	assert d.check_current_url(QUERY)

	# select_riddiculus_data_to_query_and_submit
	applicant_income_li = d.driver.find_elements_by_css_selector("form > ul > li")[5]
	applicant_income_li.find_elements_by_tag_name("input")[0].send_keys('99999'+Keys.ENTER)
	submit = d.driver.find_element_by_css_selector("button[type*='submit']")
	d.driver.execute_script("arguments[0].click();", submit)
	# try:
	# 	submit.click()
	# except:
	# 	ActionChains(d.driver).send_keys(Keys.ESCAPE)
	# 	ActionChains(d.driver).move_to_element(submit).click().perform()
	# finally:
	d.wait.until(EC.presence_of_element_located((By.ID, "con")))
	time.sleep(5)
	
	# expect_no_row_to_be_shown()
	# hf = d.driver.find_element_by_id("hf")
	# v = hf.find_element_by_tag_name("h6").text
	v = d.driver.find_element_by_css_selector("#con")
	v = v.find_element_by_tag_name("h6").text
	v = int(v.split()[1])
	assert v==0
	print("check_for_no_output_rows_for_impossible_input OK")

def check_all_data(d):
	# click_query
	time.sleep(1)
	d.driver.find_element_by_css_selector("a[href*='query'] > li").click()
	time.sleep(1)
	assert d.check_current_url(QUERY)
	#reload_to_reset_values
	d.driver.get(QUERY)

	# dont_select_anything_to_query_and_submit_to_get_all_rows #This did not work! Maybe I was wrong!
	#select_exhaustive_options_to_query_and_submit_to_get_all_rows
	first = d.driver.find_elements_by_css_selector("form > ul > li")[0]
	# print("Selecting both male and female so that all rows in the database are shown...")
	for i in first.find_elements_by_tag_name("td"):
		i.click()
	time.sleep(1)
	submit = d.driver.find_element_by_css_selector("button[type*='submit']")
	d.driver.execute_script("arguments[0].click();", submit)
	d.wait.until(EC.presence_of_element_located((By.ID, "con")))
	time.sleep(1)

	# return the number of rows output
	# hf = d.driver.find_element_by_id("hf")
	# v = hf.find_element_by_tag_name("h6").text
	#^^^Did not work for some reason
	v = d.driver.find_element_by_css_selector("#con")
	v = v.find_element_by_tag_name("h6").text
	# print(v)
	v = int(v.split()[1])
	return v

def test_incorrect_data_submission(d):
	# click_predict_in_nav_bar
	time.sleep(1)
	d.driver.find_element_by_css_selector("a[href*='predict'] > li").click()
	time.sleep(1)
	assert d.check_current_url(PREDICT)
	#reload_to_reset_values
	d.driver.get(PREDICT)

	# enter_some_alphabets_in_a_field_that_takes_numbers
	li_list = d.driver.find_elements_by_css_selector("form > ul > li")[5:9]
	for i in li_list:
		i.find_element_by_tag_name("input").send_keys('ABC')

	# click predict
	predict_btn = d.driver.find_element_by_css_selector("button[type*='submit']")
	try:
		predict_btn.click()
	except:
		ActionChains(d.driver).move_to_element(predict_btn).perform()
		d.wait.until(EC.visibility_of_element_located(
			(By.CSS_SELECTOR, "button[type*='submit']")))
		d.wait.until(EC.element_to_be_clickable(
			(By.CSS_SELECTOR, "button[type*='submit']")))
		d.driver.execute_script("arguments[0].click();", predict_btn)

	try:
		d.wait.until(EC.alert_is_present())
		assert d.driver.switch_to.alert.text == "Please fill all the details"
		d.driver.switch_to.alert.accept()
		print("test_incorrect_data_submission OK")
	except:
		print("test_incorrect_data_submission Failed")

def test_negative_data_submission(d):
	# click_predict_in_nav_bar
	time.sleep(1)
	d.driver.find_element_by_css_selector("a[href*='predict'] > li").click()
	time.sleep(1)
	assert d.check_current_url(PREDICT)
	#reload_to_reset_values
	d.driver.get(PREDICT)

	# enter_nevative_numbers
	li_list = d.driver.find_elements_by_css_selector("form > ul > li")[5:9]
	for i in li_list:
		i.find_element_by_tag_name("input").send_keys('-300')

	# click predict
	predict_btn = d.driver.find_element_by_css_selector("button[type*='submit']")
	try:
		predict_btn.click()
	except:
		ActionChains(d.driver).move_to_element(predict_btn).perform()
		d.wait.until(EC.visibility_of_element_located(
			(By.CSS_SELECTOR, "button[type*='submit']")))
		d.wait.until(EC.element_to_be_clickable(
			(By.CSS_SELECTOR, "button[type*='submit']")))
		d.driver.execute_script("arguments[0].click();", predict_btn)

	try:
		d.wait.until(EC.alert_is_present())
		assert d.driver.switch_to.alert.text == "Please fill all the details"
		d.driver.switch_to.alert.accept()
		print("test_negative_data_submission OK")
	except:
		print("test_negative_data_submission Failed")


def test_submission_without_mandatory_fields(d):
	# click_predict_in_nav_bar
	time.sleep(1)
	d.driver.find_element_by_css_selector("a[href*='predict'] > li").click()
	time.sleep(1)
	assert d.check_current_url(PREDICT)
	#reload_to_reset_values
	d.driver.get(PREDICT)

	# enter_data_but_leave_out_a_few_required_fields
	li_list = d.driver.find_elements_by_css_selector("form > ul > li")[5:7]
	for i in li_list:
		i.find_element_by_tag_name("input").send_keys('123')

	# click predict
	predict_btn = d.driver.find_element_by_css_selector("button[type*='submit']")
	try:
		predict_btn.click()
	except:
		ActionChains(d.driver).move_to_element(predict_btn).perform()
		d.wait.until(EC.visibility_of_element_located(
			(By.CSS_SELECTOR, "button[type*='submit']")))
		d.wait.until(EC.element_to_be_clickable(
			(By.CSS_SELECTOR, "button[type*='submit']")))
		d.driver.execute_script("arguments[0].click();", predict_btn)

	try:
		d.wait.until(EC.alert_is_present())
		assert d.driver.switch_to.alert.text == "Please fill all the details"
		d.driver.switch_to.alert.accept()
		print("test_submission_without_mandatory_fields OK")
	except:
		print("test_submission_without_mandatory_fields Failed")


def add_a_row_of_data(d):
	# click_predict_in_nav_bar
	time.sleep(1)
	d.driver.find_element_by_css_selector("a[href*='predict'] > li").click()
	time.sleep(1)
	assert d.check_current_url(PREDICT)
	#reload_to_reset_values
	d.driver.get(PREDICT)

	# enter_very_specific_data
	li_list = d.driver.find_elements_by_css_selector("form > ul > li")[5:9]
	for i in li_list:
		i.find_element_by_tag_name("input").send_keys('1818')

	# click predict
	predict_btn = d.driver.find_element_by_css_selector("button[type*='submit']")
	try:
		predict_btn.click()
	except:
		ActionChains(d.driver).move_to_element(predict_btn).perform()
		d.wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, "button[type*='submit']")))
		d.wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button[type*='submit']")))
		d.driver.execute_script("arguments[0].click();", predict_btn)

	# time.sleep(1)
	try:
		d.wait.until(lambda x:d.check_current_url(APPROVED)
	             or d.check_current_url(NOTAPPROVED))
		# assert d.check_current_url(APPROVED) or d.check_current_url(NOTAPPROVED)
		print("add_a_row_of_data OK")
	except:
		print("add_a_row_of_data Failed")

def test_show_new_data(d):
	# click_query
	d.driver.find_element_by_css_selector("a[href*='query'] > li").click()
	time.sleep(1)
	assert d.check_current_url(QUERY)


	# enter_very_specific_data_to_query_and_submit
	li_list = d.driver.find_elements_by_css_selector("form > ul > li")[5:9]
	for i in li_list:
		i.find_elements_by_tag_name("input")[0].send_keys('1810'+Keys.ENTER)
		i.find_elements_by_tag_name("input")[1].send_keys('1820'+Keys.ENTER)
	submit = d.driver.find_element_by_css_selector("button[type*='submit']")
	d.driver.execute_script("arguments[0].click();", submit)
	d.wait.until(EC.presence_of_element_located((By.ID, "con")))
	
	time.sleep(5)

	# expect_exactly_one_row_to_be_shown
	# hf = d.driver.find_element_by_id("hf")
	# v = hf.find_element_by_tag_name("h6").text
	v = d.driver.find_element_by_css_selector("#con")
	v = v.find_element_by_tag_name("h6").text
	v = int(v.split()[1])
	print(v)
	time.sleep(10)
	try:
		assert v == 1
		print("test_show_new_data OK")
	except:
		print("test_show_new_data Failed")



# def test_show_new_data(d): # changed what this function meant. This is no longer it
# 	no_of_rows = check_all_data(d)
	# add_a_row_of_data(d)
# 	no_of_rows2 = check_all_data(d)
# 	try:
# 		assert no_of_rows2 == no_of_rows + 1
# 		print("test_show_new_data OK")
# 	except:
# 		print("test_show_new_data Failed")



# assert len(d.driver.window_handles) == 1
# assert EC.number_of_windows_to_be(1)
try:
	driver = test_protected_page_access()
	# uname, pword = signup()
	test_incorrect_login(driver,'BLA', 'bla')
	test_correct_login(driver, 'B', 'b')
	cookie_check_after_login(driver,'B')
	check_for_no_output_rows_for_impossible_input(driver)
	test_incorrect_data_submission(driver)
	test_negative_data_submission(driver)
	test_submission_without_mandatory_fields(driver)
	add_a_row_of_data(driver)
	test_show_new_data(driver)
	driver.teardown()

finally:
	print("Done")
