import { TestBed, inject } from '@angular/core/testing';

import { ManagerChatbotService } from './manager-chatbot.service';

describe('ManagerChatbotService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManagerChatbotService]
    });
  });

  it('should be created', inject([ManagerChatbotService], (service: ManagerChatbotService) => {
    expect(service).toBeTruthy();
  }));
});
