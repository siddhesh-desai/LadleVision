import cvzone
from ultralytics import YOLO
import cv2
import easyocr

model = YOLO('Models/model_1.pt')
reader = easyocr.Reader(['en'])

results = model('Images/image_1.jpg', show=True)
# print(results)

img = cv2.imread('Images/image_1.jpg')

for r in results:
    boxes = r.boxes[0]
    for box in boxes:
        x1, y1, x2, y2 = box.xyxy[0]
        x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
        w, h = x2 - x1, y2 - y1
        bbox = (x1, y1, w, h)
        cvzone.cornerRect(img, bbox)
        print(x1,y1,x2,y2)

        cropped = img[y1:y2, x1:x2]
        # cv2.imshow('Cropped', cropped)
        # print("Ans - ")
        print(reader.readtext(cropped, detail=0))


cv2.waitKey(0)

