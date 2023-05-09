import numpy as np
import cv2
import pyautogui
import time
import pytesseract

count = 0

while True:
    count += 1
    # Get the screen dimensions
    screen_width, screen_height = pyautogui.size()

    # Capture a screenshot of a specific region
    screenshot = pyautogui.screenshot()
    crop_region = (650, 160, 1275, 238)
    indicator_cropped_image = screenshot.crop(crop_region)

    # Convert the screenshot to an OpenCV image
    screenshot = np.array(indicator_cropped_image)
    screenshot_gray = cv2.cvtColor(screenshot, cv2.COLOR_BGR2GRAY)

    _, round_indicator_region_thresh = cv2.threshold(screenshot_gray, 200, 255, cv2.THRESH_BINARY)
    round_indicator_region_string = pytesseract.image_to_string(round_indicator_region_thresh, config='--psm 7')

    print(round_indicator_region_string)

    cv2.imwrite(f'screenshot{count}.png', screenshot_gray)

    time.sleep(1)
