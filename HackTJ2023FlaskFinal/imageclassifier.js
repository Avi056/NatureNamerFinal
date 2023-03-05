// Create an instance of the neural network architecture
const model = models.resnet18(num_classes=1081);

// Load the pre-trained weights for the neural network from the tar file
const checkpointUrl = chrome.runtime.getURL('resnet18_weights_best_acc.tar');
fetch(checkpointUrl)
  .then(response => response.arrayBuffer())
  .then(buffer => {
    const checkpoint = torch.load(new Uint8Array(buffer), { map_location: 'cpu' });
    model.load_state_dict(checkpoint['model']);
    model.eval();

    // Use the loaded neural network to make predictions on new data
    const imageUrl = chrome.runtime.getURL('deadlynightshade.jpeg');
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const image = new Image();
        image.onload = () => {
          // Load a sample input image and preprocess it
          const input_size = 224;
          const canvas = document.createElement('canvas');
          canvas.width = input_size;
          canvas.height = input_size;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(image, 0, 0, input_size, input_size);
          const imageData = ctx.getImageData(0, 0, input_size, input_size);
          const imageTensor = torch.tensor(new Float32Array(imageData.data).map(x => x / 255.0));
          const mean = torch.tensor([0.485, 0.456, 0.406]);
          const std = torch.tensor([0.229, 0.224, 0.225]);
          const normalizedImage = (imageTensor.sub(mean).div(std)).reshape([1, 3, input_size, input_size]);

          const output = model(normalizedImage);
          const predictions = F.softmax(output, 1);
          const topk = torch.topk(predictions, 5);
          const metadataUrl = chrome.runtime.getURL('plantnet300k_species_id_2_name.json');
          fetch(metadataUrl)
            .then(response => response.json())
            .then(metadata => {
              const class_name = metadata[topk.indices[0][0].item()];
              console.log(class_name);
            });
        };
        image.src = URL.createObjectURL(blob);
      });
  });