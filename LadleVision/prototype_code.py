from ultralytics import YOLO
import cv2
import cvzone
import math
import numpy as np

# cap = cv2.VideoCapture(0)
# cap.set(3, 1280)
# cap.set(4, 720)

cap = cv2.VideoCapture(0)
address = "http://192.168.1.3:8080/video"
cap.open(address)

cap2 = cv2.VideoCapture(0)
address2 = "http://192.168.1.2:8080/video"
cap2.open(address2)

class_names = ['Ladle', 'Number']

model = YOLO('Models/pro_model_aug.pt')

while True:
    success1, img1 = cap.read()
    success2, img2 = cap2.read()

    f2 = cv2.resize(img2, (640, 360))
    f1 = cv2.resize(img1, (640, 360))
    img = np.hstack((f1, f2))

    results = model(img, stream=True)

    for r in results:
        boxes = r.boxes
        for box in boxes:
            x1, y1, x2, y2 = box.xyxy[0]
            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
            bbox = (x1, y1, x2-x1, y2-y1)

            conf = math.ceil(box.conf[0]*100)/100
            cls = int(box.cls[0])

            if conf>=0.6 and cls==0:
                cvzone.cornerRect(img, bbox)
                cvzone.putTextRect(img, f'{class_names[cls]} {conf}', (max(0, x1), max(20, y1 - 20)))
            if conf>=0.4 and cls==1:
                cvzone.cornerRect(img, bbox)
                cvzone.putTextRect(img, f'{class_names[cls]} {conf}', (max(0, x1), max(20, y1 - 20)))

    cv2.imshow("Image", img)
    cv2.waitKey(1)


