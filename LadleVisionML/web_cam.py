# For Prototype Ladle Detection through Webcam

from ultralytics import YOLO
import cv2
import cvzone
import math
import numpy as np
import easyocr
from database_functions import *


cap = cv2.VideoCapture(0)
cap.set(3, 1280)
cap.set(4, 720)

width = 1280
num_frames = 3

class_names = ['Number', 'Ladle', 'Ladle', 'Number', 'Ladle', 'Number']
model = YOLO('Models/final_model.pt')
reader = easyocr.Reader(['en'])

while True:
    success, img = cap.read()
    img_og = img
    results = model(img, stream=True)

    for r in results:
        boxes = r.boxes
        for box in boxes:
            x1, y1, x2, y2 = box.xyxy[0]
            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
            bbox = (x1, y1, x2 - x1, y2 - y1)

            conf = math.ceil(box.conf[0] * 100) / 100
            cls = int(box.cls[0])

            num_detected = []

            cvzone.cornerRect(img, bbox)
            cvzone.putTextRect(img, f'{class_names[cls]} {conf}', (max(0, x1), max(20, y1 - 20)))
            if cls == 0 or cls == 3 or cls == 5:
                cropped = img_og[y1:y2, x1:x2]
                num_detected += reader.readtext(cropped, detail=0)
                cvzone.cornerRect(img, bbox)
                cvzone.putTextRect(img, f'{class_names[cls]} {conf}', (max(0, x1), max(20, y1 - 20)))
                if num_detected and num_detected[0] in ['2', '3', '5', '6', '8']:

                    # print([int(num_detected[0]), datetime.now().timestamp(), int(x1 // (width / num_frames)), 55,
                    # "N"])
                    location = int(x1 // (width / num_frames))+1
                    number_detected = int(num_detected[0])
                    print(num_detected[0])
                    insert_into_table(number_detected, 32, location)
                    update_ladle_location(number_detected, location)

                    if location in (1, 9):
                        updateCircularTime(number_detected, location)
            #     cvzone.cornerRect(img, bbox)
            #     cvzone.putTextRect(img, f'{class_names[cls]} {conf}', (max(0, x1), max(20, y1 - 20)))

    cv2.imshow("Image", img)
    cv2.waitKey(1)
