import torch
from torchvision.models import resnet18
import torchvision.models as models
import torch.nn.functional as F
from PIL import Image
import numpy as np
import json
import ijson

def dothething(img_name):
    # Load the metadata file
    with open('plantnet300k_species_id_2_name.json') as f:
        metadata = json.load(f)
    # user_to_repos ={}
    metadata = list(metadata.values())
    # with open("plantnet300k_metadata.json", "rb") as f:
    #     for record in ijson.items(f, "item"):
    #         user = record["actor"]["login"]
    #         repo = record["repo"]["name"]
    #         if user not in user_to_repos:
    #             user_to_repos[user] = set()
    #         user_to_repos[user].add(repo)


    input_size = 224
    # Create an instance of the neural network architecture
    model = models.resnet18(num_classes=1081)

    # Load the pre-trained weights for the neural network from the tar file
    checkpoint = torch.load('resnet18_weights_best_acc.tar',map_location=torch.device('cpu'))
    # print(len(checkpoint))
    # print(checkpoint['epoch'])
    # print(checkpoint['model'])
    # print(checkpoint['optimizer'])
    # Set the model to evaluation mode
    model.load_state_dict(checkpoint['model'])
    model.eval()

    # Use the loaded neural network to make predictions on new data

    # image = Image.open("PlantNet-300K-main/images/1.jpg").convert('RGB')
    # image = Image.open("PoisonIvy.jpg").convert('RGB')
    # img=0
    # while img==0:
    #     var = input("Please enter the file name for a picture of a plant: ")
    #     #print(var[-4:])
    #     if var[-4:]=='.png' or var[-4:]=='.jpg' or var[-5:]=='.jpeg':
    #         confirmation = input(f"Did you mean to say {var}? Type y for yes\n")
    #         if confirmation.lower()=='y':
    #             break
    #         else:
    #             print('Please try again')
    #     else:
    #         print("Please input a valid file type: PNG, JPG, or JPEG")    
    img=Image.open(img_name)
    # image = Image.open("deadlynightshade.jpeg").convert('RGB')
    image = img.convert('RGB')

    # Load a sample input image and preprocess it
    image = image.resize((input_size, input_size))
    image = np.array(image) / 255.0
    image = (image - [0.485, 0.456, 0.406]) / [0.229, 0.224, 0.225]
    image = np.transpose(image, (2, 0, 1))
    image = torch.from_numpy(image).unsqueeze(0).float()


    with torch.no_grad():
        output=model(image)
        predictions= F.softmax(output,dim=1)
    # print(f'PREDICTIONS: {predictions}')
    topk = torch.topk(predictions, k=5)

    # for i in range(5):
    #     class_idx = topk.indices[0][i].item()
    #     class_prob = topk.values[0][i].item()
    #     class_name = metadata[class_idx]
    #     print(class_name)

        # if class_idx >= len(metadata):
        #     print(f"Error: Index {class_idx} is out of range.")
        # else:
        #     class_name = metadata[class_idx]
            # print(f"Class name: {class_name}, Class probability: {class_prob}")

    class_name = metadata[topk.indices[0][0].item()]
    print(class_name)
    return (class_name,img_name)
    # print(checkpoint)

# dothething()